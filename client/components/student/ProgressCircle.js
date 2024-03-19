import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();

  // Custom colors defined inline
  const colors = {
    primary: theme.palette.primary.main,
    blueAccent: '#FFFDD0', // Custom color
    greenAccent: '#42c5f5', // Custom color
  };

  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent} ${angle}deg 360deg),
            ${colors.greenAccent}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
