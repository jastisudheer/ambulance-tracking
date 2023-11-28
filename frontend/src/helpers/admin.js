import axios from "axios";

const Adminlogin = () => {
  //const backend_path = "http://localhost:4000";

  const data_entry = async (
    name,
    email,
    password,
    profession,
    hospital,
    d_name_d,
    hospitallocation,
    location,
    d_name,
    from1,
    to1,
    from2,
    to2
  ) => {
    console.log(
      name,
      email,
      password,
      profession,
      hospital,
      d_name_d,
      hospitallocation,
      location,
      d_name,
      from1,
      to1,
      from2,
      to2
    );
    try {
      const response = await axios.post("http://localhost:4000/api/admin", {
        name,
        email,
        password,
        profession,
        hospital,
        d_name_d,
        hospitallocation,
        location,
        d_name,
        from1,
        to1,
        from2,
        to2,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };
  return { data_entry };
};

//   const data_entry = async (
//     name,
//     email,
//     password,
//     profession,
//     hospital,
//     d_name_d,
//     hospitallocation
//   ) => {

//     const response = await fetch(`${backend_path}/api/admin`, {
//       method: "POST",
//       body: JSON.stringify(
//         name,
//         email,
//         password,
//         profession,
//         hospital,
//         d_name_d,
//         hospitallocation
//       ),
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: Bearer ${user.token},
//       },
//     });

//     const json = await response.json();
//     if (!response.ok) {
//     }
//     if (response.ok) {
//       console.log(json.data);
//     }
//   };

//   return { data_entry };
// };

export default Adminlogin;
