import { useSelector } from "react-redux";
import { getEducationById } from "../../../store/education.store";

const EmployeeEducation = ({ id, onSelectEmployeeById }) => {
  const education = useSelector(getEducationById(id))
  return <div onClick={() => onSelectEmployeeById(id)}>{education?.name}</div>;
};

export default EmployeeEducation;
