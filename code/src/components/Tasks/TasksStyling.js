import styled from 'styled-components'

export const NewTaskContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:row;
/* position:fixed; */
bottom:0;
width:100vw;
background-color:#f6efdf;
`

export const TaskPageContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
overflow-y:auto;
box-sizing: border-box;
`

export const TaskListContainer = styled.div`
margin:2em 0;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
overflow-y:auto;
box-sizing: border-box;
gap:2em;
`

export const TaskText = styled.p`
margin:0;
overflow-wrap: break-word;
/* width:50%; */
width:187px;
`

