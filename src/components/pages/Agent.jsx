import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AgentDetails from "./AgentDetails";

import axios from "axios";

export default function Agent() {
  const { id } = useParams();
  const [agentData, setAgentData] = useState([]);
  const [abilityData, setAbilityData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://valorant-api.com/v1/agents/${id}`)
      .then((response) => {
        const agentData = response.data.data;
        const abilityData = response.data.data.abilities;
        setAgentData(agentData);
        setAbilityData(abilityData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <AgentDetails agentData={agentData} abilityData={abilityData} />
    </>
  );
}
