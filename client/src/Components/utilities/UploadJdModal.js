import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalState } from '../../GlobalState';
import { Container, Row, Col, Modal, Button, Form, FormLabel } from 'react-bootstrap';
import { Checkbox, TextField, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { StyledEngineProvider } from '@mui/material/styles';
import LoadingSpinner from '../utilities/LoadingSpinner';
import { showSuccessToast, showErrorToast } from '../utilities/Toasts';
import { addJdAPI } from '../../API/JDAPI'
import arrow from '../../Icons/down_arrow.svg'
import '../UI/UploadJdModal.css'
import {skills} from '../../constants'

function UploadJdModal({ showModal, handleCloseModal }) {

//     const map = () => {
//         var arr = [];
//         skills.map(s => {
//         })
//         console.log(Object.values(skills[0]))

//     }
// useEffect(() => {
//     map()
// },[])
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
    ];

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const state = useContext(GlobalState);
    const [token] = state.UserAPI.token;
    const [callback, setCallback] = state.JDAPI.callback;

    const [jd, setJd] = useState({ position: "", department: undefined, skills: [], experience: -1, qualification: '' })
    console.log(jd)

    const departments = ["HR", "IT", "Finance", "Marketing", "Software Engineering"]
    const experience = ["None", "6 months", "1 year", "2 years", "3 years", "4 years", "5 years", "6 years", "7 years", "8 years", "9 years", "10 years", "10+ years"]
    const qualification = ["BS-Computer Science", "BS-Social Sciences", "Bachelors of Business Administration"]

    const onChangeInput = e => {
        const { name, value } = e.target;
        setJd({ ...jd, [name]: value })
    }

    const onChangeSkills = (e, value) => {
        setJd({ ...jd, 'skills': value })
    }
    const [validated, setValidated] = useState(false);


    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        console.log('in submit')
        e.preventDefault()
        let formData = new FormData();
        formData.append('position', jd.position);
        formData.append('department', jd.department);

        addJdAPI(formData, token)
            .then(res => {
                console.log(res.data)
                showSuccessToast(res.data.data.msg);
                setCallback(!callback)
                handleCloseModal()
            })
            .catch(err => {
                showErrorToast(err.response.data.error.msg)
            })
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Job Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label>Position</Form.Label>
                        <Form.Control type='text'
                            name='position'
                            placeholder='Position'
                            value={jd.position}
                            required
                            onChange={onChangeInput} />
                        </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            Department</Form.Label>
                        <Form.Select
                            name='department'
                            value={jd.department}
                            defaultValue={departments[0]}
                            onChange={onChangeInput}>
                            {departments.map((d, key) => {
                                return <option className='option' key={key} value={d}>{d}</option>;
                            })}
                        </Form.Select>
                        </Form.Group>
                    <br />
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Experience</Form.Label>
                                <Form.Select
                                    name='experience'
                                    value={jd.experience}
                                    onChange={onChangeInput}>
                                    {experience.map((d, key) => {
                                        return <option className='option' key={key} value={d}>{d}</option>;
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Min. Qualification</Form.Label>
                                <Form.Select
                                    name='qualification'
                                    value={jd.qualification}
                                    onChange={onChangeInput}>
                                    {qualification.map((d, key) => {
                                        return <option className='option' key={key} value={d}>{d}</option>;
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Form.Label>Skills</Form.Label>
                        <StyledEngineProvider injectFirst>
                            <Autocomplete
                                isOptionEqualToValue={(option, value) => option === value}
                                multiple
                                id="checkboxes-tags-demo"
                                size="small"
                                options={top100Films}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.skill_name}
                                onChange={onChangeSkills}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                )}
                                style={{ width: 500 }}

                                renderInput={(params) => (
                                    <TextField required {...params} placeholder="Skills" />
                                )}
                            />
                        </StyledEngineProvider>

                    </Row>


                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='primary-button' type='submit' onClick={handleSubmit}>
                        DONE
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal>
    )

}

export default UploadJdModal