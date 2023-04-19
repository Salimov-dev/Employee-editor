// libraries
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// components
import { loadEducationsList } from "../../../store/education.store";
import { loadEmployeesList } from "../../../store/employees.store";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmployeesList());
    dispatch(loadEducationsList());
  }, []);

  return children;
};

export default AppLoader;
