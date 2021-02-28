import styled from "styled-components";

const Load = styled.div`

  border: 4px solid #f3f3f3;
  border-top: 4px solid #d9552d77;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin: auto;
  margin-top: 50vh;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`

export default Load;