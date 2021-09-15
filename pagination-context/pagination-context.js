import { createContext, useState } from 'react'

export const PaginationContext= createContext()

export const PaginationProvider =({children})=> {
  const [currentPage, setCurrentPage]=useState(1)
  return(
    <PaginationContext.Provider value={[currentPage, setCurrentPage]}>
      {children}
    </PaginationContext.Provider>
  )
}