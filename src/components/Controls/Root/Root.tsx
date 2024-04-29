import { useState } from 'react'
import type { PropsWithChildren } from 'react'

import * as S from './styles'

// root 
const Root = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  // render
  return (
    <>
      <S.RootWrapper data-open={open}>
        {children}
      </S.RootWrapper>

      <S.RootButton onClick={() => setOpen(!open)}>
        <span className="material-symbols-rounded">
          {open ? 'menu' : 'close'}
        </span>
      </S.RootButton>
    </>
  )
}

export default Root
