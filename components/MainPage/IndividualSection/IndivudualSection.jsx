import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const IndivudualSection = ({
  Id,
  First,
  Last,
  Dob,
  Gender,
  Email,
  Picture,
  Country,
  Description,
  userData,
  setUserData,
}) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(First + Last);
  const [age, setAge] = useState(Dob);
  const [gender, setGender] = useState(Gender);
  const [country, setCountry] = useState(Country);
  const [description, setDescription] = useState(Description);
  const [stateChange, setStateChange] = useState(false);

  const OnChangeFunc = (e, type) => {
    setStateChange(true);
    if (type == "name") {
      setName(e.target.value);
    }
    if (type == "age") {
      setAge(e.target.value);
    }
    if (type == "gender") {
      setGender(e.target.value);
    }
    if (type == "country") {
      setCountry(e.target.value);
    }
    if (type == "desc") {
      setDescription(e.target.value);
    }
  };

  return (
    <IndividualUserCard key={Id}>
      <InitialCardDiv
        onClick={() => (editable ? null : setOpenDetails(!openDetails))}
      >
        <IconandNameMainDiv>
          <UserPicture src={Picture} />
          <NameInput
            value={stateChange ? name : First + Last}
            onChange={(e) => OnChangeFunc(e, "name")}
            disabled={!editable}
            style={{
              border: editable ? "1px solid lightgrey" : "0px",
              backgroundColor: "#fff",
            }}
          />
        </IconandNameMainDiv>
        {openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </InitialCardDiv>
      {openDetails ? (
        <div style={{ width: "100%" }}>
          <HorizontalInfoMain>
            <div>
              <TitleText>Age</TitleText>
              <AgeInput
                type={"text"}
                value={stateChange ? age : Dob}
                disabled={!editable}
                style={{
                  border: editable ? "1px solid lightgrey" : "0px",
                }}
                onChange={(e) => OnChangeFunc(e, "age")}
              />
            </div>
            <div>
              <TitleText>Gender</TitleText>
              <GenderInput
                value={stateChange ? gender : Gender}
                disabled={!editable}
                style={{
                  border: editable ? "1px solid lightgrey" : "0px",
                  backgroundColor: editable ? null : "#f5f5f5",
                }}
                onChange={(e) => OnChangeFunc(e, "gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Rather not say">Rather not say</option>
                <option value="Other">Other</option>
              </GenderInput>
            </div>
            <div>
              <TitleText>Country</TitleText>
              <CountyInput
                type={"text"}
                value={stateChange ? country : Country}
                disabled={!editable}
                style={{
                  border: editable ? "1px solid lightgrey" : "0px",
                }}
                onChange={(e) => OnChangeFunc(e, "country")}
              />
            </div>
          </HorizontalInfoMain>
          <div>
            <TitleText>Description</TitleText>
            <DescriptionTextArea
              value={stateChange ? description : Description}
              disabled={!editable}
              style={{
                border: editable ? "1px solid lightgrey" : "0px",
              }}
              onChange={(e) => OnChangeFunc(e, "desc")}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {editable ? (
              <>
                <CancelIcon
                  onClick={() => {
                    setEditable(false);
                    setStateChange(false);
                  }}
                />
                <ApplyIcon
                  onClick={() => {
                    setEditable(false);
                    setStateChange(true);
                  }}
                />
              </>
            ) : (
              <>
                <DeleteBinIcon
                  onClick={() => {
                    setUserData(userData.filter((item) => item.id !== Id));
                    console.log(
                      "wahid",
                      userData.filter((item) => item.id !== Id)
                    );
                  }}
                />
                <EditIcon onClick={() => setEditable(true)} />
              </>
            )}
          </div>
        </div>
      ) : null}
    </IndividualUserCard>
  );
};

export default IndivudualSection;

const IndividualUserCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid lightgrey",
  padding: "1vh 2vh",
  borderRadius: "1vh",
  width: "40%",
  marginTop: "2%",
  boxShadow: "1px 1px 3px grey",
  // ":hover": {
  //   backgroundColor: "#f5f5f5",
  // },
});
const InitialCardDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  cursor: "pointer",
});
const IconandNameMainDiv = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flex: 1,
});
const UserPicture = styled("img")({
  width: "4vw",
  borderRadius: "50%",
  boxShadow: "2px 3px 4px grey",
  marginRight: "5%",
});
const HorizontalInfoMain = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});
const TitleText = styled("p")({
  color: "grey",
  padding: 0,
  marginBottom: "1vh",
});
const NameInput = styled("input")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
  fontWeight: "400",
  fontSize: "2.5vh",
});
const AgeInput = styled("input")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
});
const GenderInput = styled("select")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
  color: "#000",
});
const CountyInput = styled("input")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
});
const DescriptionTextArea = styled("textarea")({
  width: "90%",
  height: 120,
});

const CancelIcon = styled(CancelOutlinedIcon)({
  color: "red",
  marginRight: "1vh",
  cursor: "pointer",
  ":hover": {
    boxShadow: "1px 1px 4px grey",
    borderRadius: "50%",
  },
  fontSize: "4vh",
});
const ApplyIcon = styled(CheckCircleOutlineIcon)({
  color: "green",
  cursor: "pointer",
  ":hover": {
    boxShadow: "1px 1px 4px grey",
    borderRadius: "50%",
  },
  fontSize: "4vh",
});
const DeleteBinIcon = styled(DeleteIcon)({
  color: "red",
  marginRight: "1vh",
  cursor: "pointer",
  ":hover": {
    boxShadow: "1px 1px 4px grey",
    borderRadius: "50%",
  },
  fontSize: "4vh",
});
const EditIcon = styled(CreateIcon)({
  color: "blue",
  cursor: "pointer",
  ":hover": {
    boxShadow: "1px 1px 4px grey",
    borderRadius: "50%",
  },
  fontSize: "4vh",
});
