import { createContext, useContext, useState } from 'react';

// Create the form context
export const FormContext = createContext();

// Custom hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

// Form provider component
export const FormProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Toggle form visibility
  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
  };
  
  // Close form
  const closeForm = () => {
    setIsFormOpen(false);
  };
  
  // Open form
  const openForm = () => {
    setIsFormOpen(true);
  };
  
  return (
    <FormContext.Provider 
      value={{ 
        isFormOpen, 
        toggleForm,
        closeForm,
        openForm
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
