import React from 'react';
import styled from 'styled-components';
import {useModal} from 'react-easy-modal';

export interface PropsType{
    className?: string;
}

// noinspection LessResolvedByNameOnly
const HomeStyle = styled.div`
    // style
`;

const Home = ({className}: PropsType) => {
    const {modal} = useModal();

    const openTestModal = () => {
        modal(Te)
    }

    return (
        <HomeStyle>
            <button ></button>
        </HomeStyle>
    );
}


export default Home;