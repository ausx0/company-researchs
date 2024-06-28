"use client";
import React, { useEffect } from "react";

const AddConsultationForm = ({ params }: any) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous logic here
        // For example, fetch data from an API
        const response = await fetch("your-api-endpoint");
        const data = await response.json();
        // .log(data);
      } catch (error) {
        // .error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function within useEffect
  }, [params]); // Include any dependencies in the dependency array if needed

  return <div>AddConsultation</div>;
};

export default AddConsultationForm;
