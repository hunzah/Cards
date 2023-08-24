import { useState } from 'react'
import { Checkbox } from './components/ui/checkbox'
import {Button} from "@/components/ui/button";
 import asd from "../src/assets/images/Layer 2.svg"
import s from "./components/ui/button/button.module.scss"

export function App() {
  const [checked, setChecked] = useState(false)

  return (
    <div>
        <>asd</>
      <Checkbox checked={checked} onChange={setChecked} text={'check-box'} disabled={false} />
      Hello
        <div>
            <Button className={s.button} > <img src={asd}/>Hello</Button>
            <Button className={s.button}  variant="secondary"><img src={asd}/> qweWeW</Button>
            <Button className={s.button}  variant="tertiary"><img src={asd}/> qweWeW</Button>
            <Button className={s.button}  variant="tertiary">qweWeW</Button>

            <Button className={s.button} as={"a"} href={"/link"} disabled variant="link">as link</Button>



        </div>
    </div>
  )
}
