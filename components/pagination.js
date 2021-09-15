import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { PaginationContext } from '../pagination-context/pagination-context'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  }
}))

PaginationRounded.propTypes = {
  totalPage: PropTypes.any.isRequired
}

export default function PaginationRounded ({ totalPage }) {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useContext(PaginationContext)
  // eslint-disable-next-line no-unused-vars
  const [pagee, setPagee] = useState(1)
  const handleChange = (page) => {
    if (page === 0) {
      setCurrentPage(1)
    } else {
      setCurrentPage(page)
      setPagee(page)
    }
  }
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Pagination
      onChange={(e) => handleChange(Number(e.target.textContent))}
      count={totalPage}
      variant="outlined"
      shape="rounded"
      color="primary" />
    </div>
  )
}
