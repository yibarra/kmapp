import styled from 'styled-components'

export const SelectorTension = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
  width: 100%;
`

export const SelectorTensionInput = styled.input`
  &[type="range"] {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    margin: 8px 0;
    width: 100%;
  }

  /* Removes default focus */
  &[type="range"]:focus {
    outline: none;
  }

/***** Chrome, Safari, Opera and Edge Chromium styles *****/
/* slider track */
&[type="range"]::-webkit-slider-runnable-track {
   background-color: #222;
   border-radius: 2px;
   height: 2px;
   width: 100%;
}

/* slider thumb */
&[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
   appearance: none;
   background-color: #222;
   border-radius: 100%;
   height: 14px;
   top: -6px;
   position: relative;
   width: 14px;
}

&[type="range"]:focus::-webkit-slider-thumb {   
  border: 1px solid #053a5f;
  outline: 3px solid #053a5f;
  outline-offset: 0.125rem; 
}

/******** Firefox styles ********/
/* slider track */
&[type="range"]::-moz-range-track {
   background-color: #053a5f;
   border-radius: 0.5rem;
   height: 0.5rem;
}

/* slider thumb */
&[type="range"]::-moz-range-thumb {
   border: none; /*Removes extra border that FF applies*/
   border-radius: 0; /*Removes default border-radius that FF applies*/

   /*custom styles*/
   background-color: #5cd5eb;
   height: 2rem;
   width: 1rem;
}

&[type="range"]:focus::-moz-range-thumb {
  border: 1px solid #053a5f;
  outline: 3px solid #053a5f;
  outline-offset: 0.125rem; 
}
`

export const SelectorTensionText = styled.p`
  display: flex;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  margin: 0;
  position: relative;
  width: 100%;
`
