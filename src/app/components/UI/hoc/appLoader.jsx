// libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// components
import { loadEmployeesList } from "../../../store/employees.store";
import { loadEducationsList } from "../../../store/education.store";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmployeesList());
    dispatch(loadEducationsList());
  }, []);

  return children;
};

export default AppLoader;
