import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <Box className="border-t border-slate-800 bg-slate-950 px-4 py-2">
      <Text className="text-[10px] text-slate-500 text-center">
        © {year} c2q Centerlight Health · Elderly Care Management · Internal Use Only
      </Text>
    </Box>
  );
};

export default Footer;
