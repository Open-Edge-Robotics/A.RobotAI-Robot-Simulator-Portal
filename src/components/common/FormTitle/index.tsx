import { Typography, TypographyProps } from "@mui/material";

const FormTitle = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography variant="h6" {...props}>
      {children}
    </Typography>
  );
};

export default FormTitle;
