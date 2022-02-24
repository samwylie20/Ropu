import React, {
  useRef,
  useState
} from 'react'
import { InputGroup, Switch, Textarea, InputLeftElement, Select, Button, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, FormControl, ModalBody, FormLabel, Input, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'

export default function NewPost () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const finalRef = useRef()
  const [type, setType] = useState('link')
  const [title, setTitle] = useState()
  const [link, setLink] = useState()
  const [description, setDescription] = useState()
  const [privateToCohort, setPrivateToCohort] = useState(false)

  function handleSubmit (e) {
    console.log(type, title, link, description, privateToCohort)
  }

  return (
    <>
      <Button colorScheme='orange' borderRadius='24' onClick={onOpen}>New post</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl >
              <FormLabel>Type of post</FormLabel>
              <Select ref={initialRef} onChange={(e) => setType(e.target.value)} placeholder="Select a post type">
                <option value='link'>Link</option>
                <option value='job'>Job</option>
                <option value='code'>Code</option>
                <option value='events'>Events</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Add title' onChange={(e) => setTitle(e.target.value)} value={title} />
              </FormControl>

            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <InputGroup onChange={(e) => setLink(e.target.value)} value={link}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LinkIcon color='gray.300' />}
                />
                <Input placeholder='Add link' />
              </InputGroup>

            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea onChange={(e) => setDescription(e.target.value)} value={description}/>
            </FormControl>

            <FormControl mt={4} display='flex' alignItems='center'>
              <Switch id='make-private' mr='2' colorScheme='orange' onChange={(e) => setPrivateToCohort(prevState => {
                return !prevState
              })}/>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Make private to my cohort
              </FormLabel>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button colorScheme='orange' onClick={handleSubmit}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
