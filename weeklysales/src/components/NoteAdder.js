import React from 'react'
import firebase from './firebase'
import { Modal, Header, Icon, Form, Button } from 'semantic-ui-react'
import useForm from './utils/useForm'

const NoteAdder = props => {

    const [modal, setModal] = React.useState(false)

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit } = useForm(addNote);

    async function addNote() {
        try {
            const db = firebase.firestore()
            const editedNote = await db.collection('sales').doc(props.id).set({ notes: values.notes }, { merge: true })
            console.log(editedNote)
            setModal(false)
        }
        catch { }
    }

    return (
        <Modal
            trigger={<Icon name='add square' color='green' onClick={() => setModal(true)} />} basic size='small'
            open={modal}
            onClose={() => setModal(false)}>
            <Header content='Add notes?' />
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        autoFocus
                        onChange={handleChange}
                        type='text'
                        placeholder='Notes'
                        name='notes'
                        value={values.notes || ''} />
                </Form>
                <Button positive onClick={() => setModal(false)} style={{ marginTop: '2%' }}>Done</Button>
            </Modal.Content>
        </Modal>
    )
}

export default NoteAdder