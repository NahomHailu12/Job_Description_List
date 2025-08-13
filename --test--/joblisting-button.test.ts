import JobCard from "@/app/pagelist/JobCard"
import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
interface prop{
    title: string,
    location: string,
    description: string
}
const data: prop = {
    title: "Software Engineer",
    location: "Addis Ababa,Ethiopia",
    description: "Develop and maintain software applications."
}
const id_Unbooked = "ae34jsnj3jspmo3pdin344"
const id_booked = "ae34jsnj3jspmo3pdin345"
describe('',()=>{


    const user = userEvent.setup()
    it('bookmark button should render',()=>{
        render(<JobCard data = {data} id={id_Unbooked} isbookedOnly={false}/>)
        const button = screen.getByRole('button', { name: /bookmark/i })
        expect(button).toBeInTheDocument()
    })

    it('unbookmark button should render',()=>{
        render(<JobCard data = {data} id={id_booked} isbookedOnly={false}/>)
        const button = screen.getByRole('button', { name: /unBookmark/i })
        expect(button).toBeInTheDocument()
    })
    
    it('bookmark button should be clickable',async ()=>{
        render(<JobCard data = {data} id={id_Unbooked} isbookedOnly={false}/>)
        const button = screen.getByRole('button', { name: /bookmark/i })
        await user.click(button)
        expect(button).toHaveTextContent('Unbookmark')
    })

    it('unbookmark button should render',()=>{
        render(<JobCard data = {data} id={id_booked} isbookedOnly={false}/>)
        const button = screen.getByRole('button', { name: /unBookmark/i })
        expect(button).toHaveTextContent('Unbookmark')
    })

})