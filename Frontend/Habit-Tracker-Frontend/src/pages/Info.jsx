import InfoComp from "../components/InfoComp";
import PropTypes from "prop-types";

export default function Info({ setCurrentPage }) {
  setCurrentPage("info");
  return <InfoComp />;
}

Info.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};