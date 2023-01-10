import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
  let dob = new Date(Dob);
  //calculate month difference from current date in time
  let month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  let age_dt = new Date(month_diff);

  //extract year from date
  let year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  let ageCounted = Math.abs(year - 1970);
  console.log(ageCounted);

  //states
  const [openDetails, setOpenDetails] = useState(false);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(First + Last);
  const [age, setAge] = useState(ageCounted);
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
                backgroundColor: openDetails ? null : "#fff",
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
                  value={stateChange ? age : ageCounted}
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
                    backgroundColor: editable ? "#fff" : "#FAFAFA",
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
                      // setUserData(userData.filter((item) => item.id !== Id));
                      // console.log(
                      //   "wahid",
                      //   userData.filter((item) => item.id !== Id)
                      // );
                      handleClickOpen();
                    }}
                  />
                  <EditIcon onClick={() => setEditable(true)} />
                </>
              )}
            </div>
          </div>
        ) : null}
      </IndividualUserCard>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button
            onClick={() => {
              setUserData(userData.filter((item) => item.id !== Id));
              handleClose();
            }}
            style={{ color: "red" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
  width: "100%",
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
  // flex: 1,
});
const UserPicture = styled("img")({
  width: "3vw",
  borderRadius: "50%",
  boxShadow: "2px 3px 4px grey",
  marginRight: "5%",
});
const HorizontalInfoMain = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // width: "100%",
  flexWrap: "wrap",
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
  width: "100%",
});
const AgeInput = styled("input")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
  width: "100%",
});
const GenderInput = styled("select")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
  color: "#000",
  width: "100%",
});
const CountyInput = styled("input")({
  outline: "none",
  borderRadius: "1vh",
  padding: "1vh",
  width: "100%",
});
const DescriptionTextArea = styled("textarea")({
  width: "100%",
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
