import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = ({
  type,
  width,
  height,
  backgroundColor,
  color,
  fontSize,
  borderRadius,
  children,
  marginTop
}) => {
  return (
    <Container
      type="submit"
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
      borderRadius={borderRadius}
      marginTop={marginTop}
    >
      {children}
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color:rgb(45, 117, 219);
    cursor: pointer;
  }
  text-decoration: none;
  border: none;

  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  color: ${(props) => props.color || 'black'};
  font-size: ${(props) => props.fontSize || '16px'};
  border-radius: ${(props) => props.borderRadius || '0'};
  margin-top: ${(props) => props.marginTop || '0'};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Button;