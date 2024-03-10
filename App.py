from flask import Flask, jsonify, request
from Models import User, UserLog, DBLabSamples, DBLabTests, DBLabSubTests, DBLabPatients, DBLabPatientAttachments, DBLabClients, DBLabOrders, DBLabOrderSamples
from datetime import datetime
from Config import db, create_app
from sqlalchemy import func
from twilio.rest import Client
import os, random, string

app = create_app()


#########################################################################
#                _   _                _   _           _   _             #
#     /\        | | | |              | | (_)         | | (_)            #
#    /  \  _   _| |_| |__   ___ _ __ | |_ _  ___ __ _| |_ _  ___  _ __  #
#   / /\ \| | | | __| '_ \ / _ \ '_ \| __| |/ __/ _` | __| |/ _ \| '_ \ #
#  / ____ \ |_| | |_| | | |  __/ | | | |_| | (_| (_| | |_| | (_) | | | |#
# /_/    \_\__,_|\__|_| |_|\___|_| |_|\__|_|\___\__,_|\__|_|\___/|_| |_|#
#########################################################################

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'content-type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST, GET, DELETE, UPDATE')
    response.headers.add('Content-Type', 'application/json;charset=utf-8')
    response.headers.add('preflightContinue', 'false')
    return response

@app.route('/Login', methods=['POST'])
def Login():
    QueryUser = User.query.filter(User.Username == request.form['Username'], User.Password == request.form['Password']).first()
    if QueryUser:
        random_str = generate_random_string(16)
        QueryUser.Key = str(QueryUser.Scope) + '|' + str(random_str)
        User.update(QueryUser)
        
        NewLog = UserLog(
            User_id = QueryUser.ID,
            Action = 'Login',
            TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        )
        UserLog.insert(NewLog)
        
        return {
            'ID':QueryUser.ID, 
        'Username':QueryUser.Username, 
        'Fullname':QueryUser.Fullname, 
        'Session_key':str(QueryUser.Scope) + '|' + str(random_str)
        }, 200

    else:
        return {
            'State':False,
            'Status_code': 'Wrong_Credentials'
        }, 401
    





##########################################################################################
#  _           _                     _                      _____           _            #
# | |         | |                   | |                    / ____|         | |           #
# | |     __ _| |__   ___  _ __ __ _| |_ ___  _ __ _   _  | |     ___ _ __ | |_ ___ _ __ #
# | |    / _` | '_ \ / _ \| '__/ _` | __/ _ \| '__| | | | | |    / _ \ '_ \| __/ _ \ '__|#
# | |___| (_| | |_) | (_) | | | (_| | || (_) | |  | |_| | | |___|  __/ | | | ||  __/ |   #
# |______\__,_|_.__/ \___/|_|  \__,_|\__\___/|_|   \__, |  \_____\___|_| |_|\__\___|_|   #
#                                                  |___/                                 #
##########################################################################################
    
################## START Samples ##################
    
@app.route('/LabSamples', methods=['GET','POST','PUT','DELETE'])
def LabSamples():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QuerySample = DBLabSamples.query.get(request.args.get('Sample_id'))
            if QuerySample:
                return {
                    'ID':QuerySample.ID,
                    'Sample':QuerySample.Sample,
                    'State':QuerySample.State
                }, 200
                
            else:
                return {
                    'State':'Sample Not Found'
                }, 404
            
        elif request.method == 'POST':
            NewSample = DBLabSamples(
                Sample = request.form['Sample'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabSamples.insert(NewSample)
            
            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added Sample ' + request.form['Sample'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)
            
            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'PUT':
            QuerySample = DBLabSamples.query.get(request.form['Sample_id'])
            QuerySample.Sample = request.form['Sample']
            QuerySample.State = 1
            QuerySample.User_id = QueryAuth.ID
            QuerySample.TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            DBLabSamples.update(QuerySample)
            
            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Updated Sample ' + request.form['Sample'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)
            
            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'DELETE':
            QuerySample = DBLabSamples.query.get(request.form['Sample_id'])
            TheSample = QuerySample.Sample
            DBLabSamples.delete(QuerySample)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Deleted Sample ' + TheSample,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)
            
            return {
                'State':'OK'
            }, 200
    else:
        return {
            'State':'Not Authorized'
        }, 401
    
@app.route('/LabSamples/All', methods=['GET'])
def LabSamplesAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QuerySample = DBLabSamples.query.all()
        AllSamples = [{"ID": Sample.ID, "Sample": Sample.Sample, "State":Sample.State} for Sample in QuerySample]
        return jsonify(AllSamples), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

################## END Samples ####################




################## START Tests ####################

@app.route('/LabTests', methods=['GET','POST','PUT','DELETE'])
def LabTests():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QueryTest = db.session.query(DBLabTests, DBLabSamples.Sample).join(DBLabSamples, DBLabTests.Sample_id == DBLabSamples.ID).filter(DBLabTests.ID == request.args.get('Test_id')).first()
            if QueryTest:
                return {
                    'ID':QueryTest[0].ID,
                    'Test':QueryTest[0].Test,
                    'Sample':QueryTest[1],
                    'OnePrice':QueryTest[0].OnePrice,
                    'Price':QueryTest[0].Price,
                    'State':QueryTest[0].State
                }, 200
            else:
                return {
                    'State':'Not Test Found'
                }, 404
            
        elif request.method == 'POST':
            NewTest = DBLabTests(
                Test = request.form['Test'],
                OnePrice = request.form['OnePrice'],
                Price = request.form['Price'],
                Sample_id = request.form['Sample_id'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabTests.insert(NewTest)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added Test ' + request.form['Test'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'PUT':
            QueryTest = DBLabTests.query.get(request.form['Test_id'])
            QueryTest.Test = request.form['Test']
            QueryTest.OnePrice = request.form['OnePrice']
            QueryTest.Price = request.form['Price']
            QueryTest.State = 1
            QueryTest.User_id = QueryAuth.ID
            QueryTest.TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            DBLabTests.update(QueryTest)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Updated Test ' + request.form['Test'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'DELETE':
            QueryTest = DBLabTests.query.get(request.form['Test_id'])
            DBLabTests.delete(QueryTest)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Deleted Test ' + request.form['Test'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

@app.route('/LabTests/All', methods=['GET'])
def LabTestsAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QueryTest = db.session.query(DBLabTests, DBLabSamples.Sample).join(DBLabSamples, DBLabTests.Sample_id == DBLabSamples.ID).all()
        AllTests = [{"ID": "#TS-" + str(Test[0].ID), "Test": Test[0].Test, "Sample":Test[1], "OnePrice":Test[0].OnePrice, "Price":Test[0].Price, "State":Test[0].State} for Test in QueryTest]
        return jsonify(AllTests), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

@app.route('/LabTests/Filter', methods=['GET'])
def LabTestsFilter():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QueryTests = DBLabTests.query.filter(DBLabTests.Sample_id == request.args.get('Sample_id')).all()
        AllTests = [{"ID": "#TS-" + str(Test.ID), "Test": Test.Test, "Sample":Test.Sample_id, "OnePrice":Test.OnePrice, "Price":Test.Price, "State":Test.State} for Test in QueryTests]
        return jsonify(AllTests), 200
    else:
        return {
            'State' : 'Not Authorized'
        }, 401
    
################## END Tests ######################



################## START SubTests ##################

@app.route('/LabSubTests', methods=['GET','POST','PUT','DELETE'])
def LabSubTests():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QuerySubTest = db.session.query(DBLabSubTests, DBLabTests.Test).join(DBLabTests, DBLabSubTests.Test_id == DBLabTests.ID).filter(DBLabSubTests.ID == request.args.get('SubTest_id')).first()
            if QuerySubTest:
                return {
                    'ID':QuerySubTest[0].ID,
                    'SubTest':QuerySubTest[0].SubTest,
                    'Test':QuerySubTest[1].Test,
                    'Cost':QuerySubTest[0].Cost,
                    'Price':QuerySubTest[0].Price,
                    'Result':QuerySubTest[0].Result,
                    'RFrom':QuerySubTest[0].RFrom,
                    'RTo':QuerySubTest[0].RTo,
                    'Unit':QuerySubTest[0].Unit,
                    'State':QuerySubTest[0].State
                }, 200
            else:
                return {
                    'State':'Not SubTest Found'
                }, 404
            
        elif request.method == 'POST':
            NewSubTest = DBLabSubTests(
                SubTest = request.form['SubTest'],
                Test_id = request.form['Test_id'],
                Cost = request.form['Cost'],
                Price = request.form['Price'],
                Result = request.form['Result'],
                RFrom = request.form['RFrom'],
                RTo = request.form['RTo'],
                Unit = request.form['Unit'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabSubTests.insert(NewSubTest)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added SubTest ' + request.form['SubTest'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'PUT':
            QuerySubTest = DBLabSubTests.query.get(request.form['SubTest_id'])
            QuerySubTest.SubTest = request.form['SubTest']
            QuerySubTest.Test_id = request.form['Test_id']
            QuerySubTest.Cost = request.form['Cost']
            QuerySubTest.Price = request.form['Price']
            QuerySubTest.Result = request.form['Result']
            QuerySubTest.RFrom = request.form['RFrom']
            QuerySubTest.RTo = request.form['RTo']
            QuerySubTest.Unit = request.form['Unit']
            QuerySubTest.State = 1
            QuerySubTest.User_id = QueryAuth.ID
            QuerySubTest.TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            DBLabSubTests.update(QuerySubTest)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Updated SubTest ' + request.form['SubTest'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'DELETE':
            QuerySubTest = DBLabSubTests.query.get(request.form['SubTest_id'])
            DBLabSubTests.delete(QuerySubTest)
            return {
                'State':'OK'
            }, 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

@app.route('/LabSubTests/All', methods=['GET'])
def LabSubTestsAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QuerySubTest = db.session.query(DBLabSubTests, DBLabTests.Test).join(DBLabTests, DBLabSubTests.Test_id == DBLabTests.ID).all()
        AllSubTests = [{"ID": SubTest[0].ID, "SubTest": SubTest[0].SubTest, "Test":SubTest[1], "Cost":SubTest[0].Cost, "Price":SubTest[0].Price, "Result":SubTest[0].Result, "RFrom":SubTest[0].RFrom, "RTo":SubTest[0].RTo, "Unit":SubTest[0].Unit, "State":SubTest[0].State} for SubTest in QuerySubTest]
        return jsonify(AllSubTests), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

@app.route('/LabSubTests/Filter', methods=['GET'])
def LabSubTestsFilter():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QuerySubTests = DBLabSubTests.query.filter(DBLabSubTests.Test_id == request.args.get('Test_id')).all()
        AllSubTests = [{"ID": SubTest.ID, "SubTest": SubTest.SubTest, "Test":SubTest.Test_id, "Cost":SubTest.Cost, "Price":SubTest.Price, "Result":SubTest.Result, "RFrom":SubTest.RFrom, "RTo":SubTest.RTo, "Unit":SubTest.Unit, "State":SubTest.State} for SubTest in QuerySubTests]
        return jsonify(AllSubTests), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

################## END SubTests ####################




################## START Patients ####################

@app.route('/LabPatients', methods=['GET','POST','PUT','DELETE'])
def LabPatients():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QueryPatient = DBLabPatients.query.get(request.args.get('Patient_id'))
            if QueryPatient:
                return {
                    'ID':QueryPatient.ID,
                    'Name':QueryPatient.Name,
                    'Age':QueryPatient.Age,
                    'Gender':QueryPatient.Gender,
                    'Phone':QueryPatient.Phone,
                    'Address':QueryPatient.Address,
                    'Disease':QueryPatient.Disease,
                    'Weight':QueryPatient.Weight,
                    'Height':QueryPatient.Height,
                    'Hypertension':QueryPatient.Hypertension,
                    'Diabetes':QueryPatient.Diabetes,
                    'Skin':QueryPatient.Skin,
                    'Notes':QueryPatient.Notes,
                    'State':QueryPatient.State
                }, 200
            else:
                return {
                    'State':'Not Patient Found'
                }, 404
            
        elif request.method == 'POST':
            NewPatient = DBLabPatients(
                Name = request.form['Name'],
                Age = request.form['Age'],
                Gender = request.form['Gender'],
                Phone = request.form['Phone'],
                Address = request.form['Address'],
                Disease = request.form['Disease'],
                Weight = request.form['Weight'],
                Height = request.form['Height'],
                Hypertension = request.form['Hypertension'],
                Diabetes = request.form['Diabetes'],
                Skin = request.form['Skin'],
                Notes = request.form['Notes'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabPatients.insert(NewPatient)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added Patient ' + request.form['Name'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'PUT':
            QueryPatient = DBLabPatients.query.get(request.form['Patient_id'])
            QueryPatient.Name = request.form['Name']
            QueryPatient.Age = request.form['Age']
            QueryPatient.Gender = request.form['Gender']
            QueryPatient.Phone = request.form['Phone']
            QueryPatient.Address = request.form['Address']
            QueryPatient.Disease = request.form['Disease']
            QueryPatient.Weight = request.form['Weight']
            QueryPatient.Height = request.form['Height']
            QueryPatient.Hypertension = request.form['Hypertension']
            QueryPatient.Diabetes = request.form['Diabetes']
            QueryPatient.Skin = request.form['Skin']
            QueryPatient.Notes = request.form['Notes']
            QueryPatient.State = 1
            QueryPatient.User_id = QueryAuth.ID
            QueryPatient.TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            DBLabPatients.update(QueryPatient)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Updated Patient ' + request.form['Name'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'DELETE':
            QueryPatient = DBLabPatients.query.get(request.form['Patient_id'])
            DBLabPatients.delete(QueryPatient)
            return {
                'State':'OK'
            }, 200
    else:
        return {
            'State':'Not Authorized'
        }, 401
    
@app.route('/LabPatients/All', methods=['GET'])
def LabPatientsAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QueryPatient = DBLabPatients.query.all()
        AllPatients = [{"ID":Patient.ID, "Name":Patient.Name, "Age":Patient.Age, "Gender":Patient.Gender, "Phone":Patient.Phone, "Address":Patient.Address, "Disease":Patient.Disease, "Weight":Patient.Weight, "Height":Patient.Height, "Hypertension":Patient.Hypertension, "Diabetes":Patient.Diabetes, "Skin":Patient.Skin, "Notes":Patient.Notes} for Patient in QueryPatient]
        return jsonify(AllPatients), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401
    
@app.route('/LabPatients/Attachments', methods=['GET','POST','PUT','DELETE'])
def LabPatientsAttachments():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QueryAttachment = DBLabPatientAttachments.query.get(request.args.get('Attachment_id'))
            return {
                'ID':QueryAttachment.ID,
                'Patient_id':QueryAttachment.Patient_id,
                'File':QueryAttachment.File,
                'Path':QueryAttachment.Path
            }, 200
        
        if request.method == 'POST':
            NewAttachment = DBLabPatientAttachments(
                Patient_id = request.form['Patient_id'],
                File = request.form['File'],
                Path = request.form['Path']
            )
            DBLabPatientAttachments.insert(NewAttachment)
            return {
                'State':'OK'
            }, 200
        
        if request.method == 'PUT':
            QueryAttachment = DBLabPatientAttachments.query.get(request.form['Attachment_id'])
            QueryAttachment.Patient_id = request.form['Patient_id']
            QueryAttachment.File = request.form['File']
            QueryAttachment.Path = request.form['Path']
            DBLabPatientAttachments.update(QueryAttachment)
            return {
                'State':'OK'
            }, 200
        
        if request.method == 'DELETE':
            QueryAttachment = DBLabPatientAttachments.query.get(request.form['Attachment_id'])
            DBLabPatientAttachments.delete(QueryAttachment)
            return {
                'State':'OK'
            }, 200

    else:
        return {
            'State':'Not Authorized'
        }, 401
    
@app.route('/LabPatients/Attachments/All', methods=['GET'])
def LabPatientsAttachmentsAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QueryAttachment = DBLabPatientAttachments.query.all()
        AllAttachments = [{"ID":Attachment.ID, "Patient_id":Attachment.Patient_id, "File":Attachment.File, "Path":Attachment.Path} for Attachment in QueryAttachment]
        return jsonify(AllAttachments), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

################## END Patients ######################




################## START Clients ####################

@app.route('/LabClients', methods=['GET','POST','PUT','DELETE'])
def LabClients():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QueryClient = DBLabClients.query.get(request.args.get('Client_id'))
            if QueryClient:
                return {
                    'ID':QueryClient.ID,
                    'Name':QueryClient.Name,
                    'Email':QueryClient.Email,
                    'Phone':QueryClient.Phone,
                    'Address':QueryClient.Address,
                    'Rep':QueryClient.Rep,
                    'State':QueryClient.State,
                }, 200
            else:
                return {
                    'State':'Not Client Found'
                }, 404
            
        elif request.method == 'POST':
            NewClient = DBLabClients(
                Name = request.form['Name'],
                Email = request.form['Email'],
                Phone = request.form['Phone'],
                Address = request.form['Address'],
                Rep = request.form['Rep'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabClients.insert(NewClient)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added Client ' + request.form['Name'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'PUT':
            QueryClient = DBLabClients.query.get(request.form['Client_id'])
            QueryClient.Name = request.form['Name']
            QueryClient.Email = request.form['Email']
            QueryClient.Phone = request.form['Phone']
            QueryClient.Address = request.form['Address']
            QueryClient.Rep = request.form['Rep']
            QueryClient.State = 1
            QueryClient.User_id = QueryAuth.ID
            QueryClient.TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            DBLabClients.update(QueryClient)

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Updated Client ' + request.form['Name'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK'
            }, 200
        
        elif request.method == 'DELETE':
            QueryClient = DBLabClients.query.get(request.form['Client_id'])
            DBLabClients.delete(QueryClient)
            return {
                'State':'OK'
            }, 200
    else:
        return {
            'State':'Not Authorized'
        }, 401
    
@app.route('/LabClients/All', methods=['GET'])
def LabClientsAll():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        QueryClient = DBLabClients.query.all()
        AllClients = [{"ID":Client.ID, "Name":Client.Name, "Email":Client.Email, "Phone":Client.Phone, "Address":Client.Address, "Rep":Client.Rep, "State":Client.State} for Client in QueryClient]
        return jsonify(AllClients), 200
    else:
        return {
            'State':'Not Authorized'
        }, 401

################## END Clients ######################
    



################## START Orders ####################
    
@app.route('/LabOrders', methods=['GET','POST','PUT','DELETE'])
def LabOrders():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'GET':
            QueryOrder = DBLabOrders.query.get(request.args.get('Order_id'))
            if QueryOrder:
                return {
                    'ID':QueryOrder.ID,
                    'Date':QueryOrder.Date,
                    'Type':QueryOrder.Type,
                    'Client_id':QueryOrder.Client_id,
                    'Notes':QueryOrder.Notes,
                    'Cost':QueryOrder.Cost,
                    'Discount':QueryOrder.Discount,
                    'BeforeDiscount':QueryOrder.BeforeDiscount,
                    'Total':QueryOrder.Total,
                    'Completed':QueryOrder.Completed,
                    'Referred':QueryOrder.Referred,
                    'State':QueryOrder.State
                }, 200
            else:
                return {
                    'State':'Not Order Found'
                }, 404
            
        elif request.method == 'POST':
            NewOrder = DBLabOrders(
                Date = request.form['Date'],
                Type = request.form['Type'],
                Client_id = request.form['Client_id'],
                Notes = request.form['Notes'],
                Cost = request.form['Cost'],
                Discount = request.form['Discount'],
                BeforeDiscount = request.form['BeforeDiscount'],
                Total = request.form['Total'],
                Completed = request.form['Completed'],
                Referred = request.form['Referred'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabOrders.insert(NewOrder)

            QueryTheOrder = DBLabOrders.query.filter(func.max(DBLabOrders.ID)).first()

            NewLog = UserLog(
                User_id = QueryAuth.ID,
                Action = 'Added Order ' + request.form['Date'],
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            UserLog.insert(NewLog)

            return {
                'State':'OK',
                'Order_id':QueryTheOrder.ID,
                'Date':QueryTheOrder.Date,
                'Type':QueryTheOrder.Type,
                'Client_id':QueryTheOrder.Client_id,
            }, 200
        
################## END Orders ####################
        

################## START OrderSamples ####################
        
@app.route('/LabOrderSamples', methods=['GET','POST','PUT','DELETE'])
def LabOrderSamples():
    AuthCode = request.headers.get('Authorization')
    QueryAuth = User.query.filter(User.Key == AuthCode).first()
    if QueryAuth:
        if request.method == 'POST':
            NewOrderSample = DBLabOrderSamples(
                Order_id = request.form['Order_id'],
                Patient_id = request.form['Patient_id'],
                Sample_id = request.form['Sample_id'],
                State = 1,
                User_id = QueryAuth.ID,
                TimeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
            )
            DBLabOrderSamples.insert(NewOrderSample)
            return {
                'State':'OK'
            }, 200

########################
#  _____  _    _ _   _ #
# |  __ \| |  | | \ | |#
# | |__) | |  | |  \| |#
# |  _  /| |  | | . ` |#
# | | \ \| |__| | |\  |#
# |_|  \_\\____/|_| \_|#
########################                      
                      
if __name__ == '__main__':
    app.run(debug=True)