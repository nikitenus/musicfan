import { Header } from "@/common/components/Header/Header.tsx"
import { Routing } from "@/common/routing"
import s from "./App.module.css"

function App() {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  )
}

export default App
