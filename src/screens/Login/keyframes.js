import { keyframes } from 'styled-components';

export const fade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;


export const nono = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-15%);
  }
  75% {
    transform: translateX(15%);
  }
`;


