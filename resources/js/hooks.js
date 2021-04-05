import { useState, useEffect, useRef } from 'react'

const usePagination = (endpoint = () => {}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [meta, setMeta] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    endpoint()
      .then((response) => {
        setData((data) => [...data, ...response.data])
        setMeta(response.meta)
      })
      .finally(() => setLoading(false))

    return () => {}
  }, [page])

  return [data, loading, meta, page, setPage, setData]
}

export { usePagination }
