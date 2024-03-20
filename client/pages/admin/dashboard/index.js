import RootLayout from "@/layouts/RootLayout";
import React from "react";
import { Box, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

// import StatBox from "../../components/StatBox";

function Dashboard() {
  const theme = useTheme();
  const colors = theme.palette.mode === "dark" ? theme.palette.primary : theme.palette.secondary;

  // Custom background color for StatBox components
  const statBoxBackgroundColor = '#42c5f5'; // Custom color

  return (
    <RootLayout>
    {/*  <Box m="20px">
 
         <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
       
          <Box
            gridColumn="span 3"
            backgroundColor={statBoxBackgroundColor} // Custom background color
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Emails Sent"
              progress={0.5}
              increase="+14%"
              icon={<EmailIcon sx={{ color: colors.dark }} />}
              backgroundColor={statBoxBackgroundColor} // Pass the background color to StatBox
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
              title="431,225"
              subtitle="Sales Obtained"
              progress={0.50}
              increase="+21%"
              icon={<PointOfSaleIcon sx={{ color: colors.dark }} />}
              backgroundColor={statBoxBackgroundColor} // Pass the background color to StatBox
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
              title="32,441"
              subtitle="New Clients"
              progress={0.30}
              increase="+5%"
              icon={<PersonAddIcon sx={{ color: colors.dark }} />}
              backgroundColor={statBoxBackgroundColor} // Pass the background color to StatBox
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
              title="1,325,134"
              subtitle="Traffic Received"
              progress={0.80}
              increase="+43%"
              icon={<TrafficIcon sx={{ color: colors.dark }} />}
              backgroundColor={statBoxBackgroundColor} // Pass the background color to StatBox
            />
          </Box>
        </Box>
      </Box> */}
    </RootLayout>
  );
}

export default Dashboard;
