import React, { useState } from 'react'
import { Input, Button } from "@nextui-org/react"
import {Spinner} from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface UrlFormProps {
  onSubmit: (url: string) => void,
  loader: boolean,
  setLoader: (loader: boolean) => void
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, loader, setLoader }) => {
  const apiToken = useSelector((state:RootState) => state.apiToken.token);
  const user = localStorage.getItem('user');
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim());
      setLoader(true);
      setUrl('')
    }
    console.log(url.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="url"
        label="Enter URL to shorten"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      {apiToken && user && <Button className='w-full my-2 jost-bold text-medium' type="submit" color="success" onClick={handleSubmit}>
        {loader ? <Spinner size='sm' /> : 'Shorten URL'}
      </Button>}
      {!apiToken && user && <Button className='w-full my-2 jost-bold text-medium'  color="default">
        Create a API_TOKEN to shorten URL
      </Button>}
      {!apiToken && !user && <Button className='w-full my-2 jost-bold text-medium'  color="default">
        Login / Register to shorten URL
      </Button>}
    </form>
  )
}

export default UrlForm