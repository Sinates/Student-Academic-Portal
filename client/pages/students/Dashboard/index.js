import RootLayout from "@/layouts/RootLayout";
import React from "react";
import { Box, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "@/components/student/StatBox";
import SchoolIcon from '@mui/icons-material/School';

function Dashboard() {
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? theme.palette.primary : theme.palette.secondary;

  // Custom background color for StatBox components
  const statBoxBackgroundColor = '#334155'; // Custom color

  return (
    <RootLayout>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
           

          
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={statBoxBackgroundColor} // Custom background color
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              // title="12,361"
              subtitle="Database"
              progress={0.75}
              increase="14%"
              icon={<SchoolIcon sx={{ color: colors.dark }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={statBoxBackgroundColor} // Custom background color
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              // title="Calculus"
              subtitle="Calculus"
              progress={0.5}
              increase="21%"
              icon={<SchoolIcon sx={{ color: colors.dark }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={statBoxBackgroundColor} // Custom background color
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              // title="Data structures"
              subtitle="compiler"
              progress={0.30}
              increase="5%"
              icon={<SchoolIcon sx={{ color: colors.primary }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={statBoxBackgroundColor} // Custom background color
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              // title="Networking"
              subtitle="Networking"
              progress={0.80}
              increase="43%"
              icon={<SchoolIcon sx={{ color: colors.dark }} />}
            />
          </Box>
        </Box>
      </Box>
    </RootLayout>
  );
}

export default Dashboard;
