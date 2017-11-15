import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export default styled.div`
    display: inline-block;
    .roll {
        animation: 
            ${rotate360} 
            2s 
            ease-in;
    }
`;