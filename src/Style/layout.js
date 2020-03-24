import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  box-sizing: border-box;
  padding: 16px;
  border: 2px solid #add5ff;
  border-radius: 8px;
  box-shadow: 0px 3px 8px 3px rgba(95, 158, 160, 0.15);
  z-index: 1;
  background: white;
`;

export const Title = styled.h2`
  font-size: 1.5em;
  margin-top: 0.3em;
`;

export const ReceiptWrapper = styled.div`
  filter: drop-shadow(0px 3px 2px rgba(174, 174, 174, 0.35));
`;

export const Receipt = styled.div`
  width: 100%;
  max-width: 343px;
  box-sizing: border-box;
  padding: 16px;
  margin-left: 16px;
  background: white;
  width: calc(100% - 32px);
  padding: 8px 16px 16px;
  box-sizing: border-box;
  background-image: linear-gradient(
    0deg,
    #f9f9f9 0%,
    #fefefe 58%,
    #fefefe 67%,
    #f9f9f9 100%
  );
  clip-path: polygon(
    100% 80%,
    100% 0,
    0 0,
    0 85%,
    3.333333333% 100%,
    6.666666667% 85%,
    10% 100%,
    13.333333333% 85%,
    16.666666667% 100%,
    20% 85%,
    23.333333333% 100%,
    26.666666667% 85%,
    30% 100%,
    33.333333333% 85%,
    36.666666667% 100%,
    40% 85%,
    43.333333333% 100%,
    46.666666667% 85%,
    50% 100%,
    53.333333333% 85%,
    56.666666667% 100%,
    60% 85%,
    63.333333333% 100%,
    66.666666667% 85%,
    70% 100%,
    73.333333333% 85%,
    76.666666667% 100%,
    80% 85%,
    83.333333333% 100%,
    86.666666667% 85%,
    90% 100%,
    93.333333333% 85%,
    96.666666667% 100%
  );
  transition: transform cubic-bezier(0.39, 0.58, 0.57, 1) 0.8s;
  transform: translateY(-150px);

  &.open {
    transform: translateY(0);
  }
`;
