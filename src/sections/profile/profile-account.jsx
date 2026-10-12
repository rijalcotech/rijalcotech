// import Grid from "@mui/material/Grid2";

// import { ProfileGeneral } from "./profile-general";
// import { ProfileSecurity } from "./profile-security";

// export function ProfileAccount() {
//   return (
//     <Grid container spacing={3} >
//       <Grid size={{ xs: 12, md: 6 }}>
//         <ProfileGeneral />
//       </Grid>

//       <Grid size={{ xs: 12, md: 6 }}>
//         <ProfileSecurity />
//       </Grid>
//     </Grid>
//   );
// }
import { ProfileGeneral } from "./profile-general";
import { ProfileSecurity } from "./profile-security";

export function ProfileAccount() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="w-full">
        <ProfileGeneral />
      </div>

      <div className="w-full">
        <ProfileSecurity />
      </div>
    </div>
  );
}