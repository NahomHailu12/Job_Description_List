import React from 'react';
import JobCard from '../Page'
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

describe('test for job',()=>{
    it('test for render',()=>{
        const data = {
            title: 'Job Title',
            description: 'Job description',
            location: 'Location'
        }
        render(
            <Pagelist />
    )
        screen.getByRole("button",{name: "Bookmark"})
    })
})