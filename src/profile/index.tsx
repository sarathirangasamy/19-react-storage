import './style.css';

import { useEffect, useState } from 'react';

interface ProfileDetails {
  name: string;
  email: string;
  mobile: string;
}

export const ProfileInfo: React.FC = () => {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    email: "",
    mobile: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [allProfileDetails, setAllProfileDetails] = useState<ProfileDetails[]>(
    []
  );

  useEffect(() => {
    getAllProfile();
  }, []);

  function getAllProfile() {
    const getTotoListDetails = JSON.parse(localStorage.getItem("toDO") || "[]");
    setAllProfileDetails(getTotoListDetails || []);
  }

  const onChangeInputField = (fieldValue: any, type: string) => {
    const value = fieldValue.target.value;
    setProfileDetails((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const onFinish = () => {
    if (!profileDetails?.name) return alert("Please Enter Name");
    if (!profileDetails?.email) return alert("Please Enter Email");
    if (!profileDetails?.mobile) return alert("Please Enter Mobile");

    const getTotoListDetails = JSON.parse(localStorage.getItem("toDO") || "[]");

    if (!editIndex) {
      const itemIndex = allProfileDetails?.findIndex(
        (profile, index) => index === editIndex
      );

      const updatedTodo = [
        ...allProfileDetails.slice(0, itemIndex),
        Object.assign({}, allProfileDetails[itemIndex], profileDetails),
        ...allProfileDetails.slice(itemIndex + 1),
      ];

      localStorage.setItem("toDO", JSON.stringify(updatedTodo));
    } else {
      const modifyProfile = {
        ...profileDetails,
      };

      getTotoListDetails.push(modifyProfile);
      localStorage.setItem("toDO", JSON.stringify(getTotoListDetails));
    }

    setProfileDetails({
      name: "",
      email: "",
      mobile: "",
    });
    setEditIndex(null);
    setIsEdit(false);
    getAllProfile();
  };

  const onEditTodo = (profileDetails: ProfileDetails, index: number) => {
    setIsEdit(true);
    setProfileDetails(profileDetails);
    setEditIndex(index);
  };

  const onDeleteTodo = (indexNumber: number) => {
    const removeTodoValue = allProfileDetails?.filter(
      (profile, index) => index !== indexNumber
    );
    localStorage.setItem("toDO", JSON.stringify(removeTodoValue));
    getAllProfile();
  };

  return (
    <>
      <div className="container">
        <h4>Todo Create</h4>

        <div className="todo-create-form">
          <div className="flex-row">
            <label className="primary-txt">Name</label>
            <input
              className="custom-input-design"
              type="text"
              value={profileDetails.name}
              onChange={(e) => onChangeInputField(e, "name")}
            ></input>
          </div>

          <div className="flex-row">
            <label className="primary-txt">Email</label>
            <input
              type="email"
              className="custom-input-design"
              value={profileDetails.email}
              onChange={(e) => onChangeInputField(e, "email")}
            ></input>
          </div>

          <div className="flex-row">
            <label className="primary-txt">Mobile</label>
            <input
              type="tel"
              className="custom-input-design"
              value={profileDetails.mobile}
              onChange={(e) => onChangeInputField(e, "mobile")}
            ></input>
          </div>

          <button className="custom-btn" onClick={onFinish}>
            {isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </div>

      <div className="container">
        {allProfileDetails?.length ? <h4>Toto List</h4> : null}
        {allProfileDetails?.map((profile, index) => (
          <div className="custom-table" key={index}>
            <div>
              <h4>Name: {profile.name || ""}</h4>
              <h4>Email: {profile.email || ""}</h4>
              <h4>Mobile: {profile.mobile || ""}</h4>
            </div>
            <div>
              <button
                className="custom-edit-btn"
                onClick={() => onEditTodo(profile, index)}
              >
                Edit
              </button>
              <button
                className="custom-delete-btn"
                onClick={() => onDeleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
