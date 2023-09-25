import InfoComp from "../components/InfoComp";
import PropTypes from "prop-types";
import { useEffect } from 'react';

export default function Info({ setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("info");
  }, [setCurrentPage]); // Empty dependency array to run the effect once
  return <InfoComp />;
}

Info.propTypes = {
  setCurrentPage: PropTypes.func.isRequired
};