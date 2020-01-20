import React from 'react'

import { Form } from 'semantic-ui-react'

const YearSelector = props => {

    return (
        <Form>
            <Form.Group inline>
                <Form.Field onChange={(e) => props.setYear(Number(e.target.value))} control='select' name='year' label='Year'>
                    <option value={2020}>2020</option>
                    <option value={2019}>2019</option>
                    <option value={2018}>2018</option>
                    <option value={2017}>2017</option>
                </Form.Field>
            </Form.Group>
        </Form>
    )
}

export default YearSelector