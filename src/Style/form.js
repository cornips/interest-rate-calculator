import styled, { css } from "styled-components";

export const Label = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8em;

  span {
    margin-bottom: 0.3em;
  }

  .has-icon {
    position: relative;
    display: flex;

    & svg {
      position: absolute;
      align-self: center;
      z-index: -1;
      padding-left: 8px;
    }

    & input,
    & select {
      line-height: 1.3em;
      padding-left: ${props => (props.large ? "36px" : "34px")};
    }
  }
`;

const InputField = props => css`
  position: relative;
  appearance: none;
  background: transparent;
  border: 2px solid #add5ff;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => (props.large ? "8px 12px" : "8px 10px")};
  font-size: ${props => (props.large ? "1.2em" : "1em")};
  z-index: 1;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 3px #5f9ea0;
    border-color: #208eff;
  }
`;

export const Input = styled.input`
  ${InputField}
  &.has-icon {
    padding-left: ${props => (props.large ? "36px" : "34px")};
  }
`;

export const SelectBox = styled.div`
  position: relative;
  display: flex;
`;

export const Select = styled.select`
  ${InputField}
  cursor: pointer;
  + svg {
    position: absolute;
    right: 1em;
    z-index: -1;
    align-self: center;
  }
`;
