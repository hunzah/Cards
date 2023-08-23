import { useState } from 'react'

import { Checkbox } from './components/ui/checkbox'
import {Button} from "@/components/ui/button";

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={setChecked} text={'check-box'} disabled={false} />
      Hello
        <Button variant={"tertiary"} as={"a"} href={"https://www.youtube.com/"} target={"_blank"} fullWidth> button </Button>
        <Button  as="a" href={"/link"}>Hello</Button>
        <Button variant="primary" href={"/link"} disabled >Hello</Button>
        <Button>Hello</Button>

    </div>
  )
}
