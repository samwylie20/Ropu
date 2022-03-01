import React, {
  useRef,
  useEffect,
  useState
} from 'react'
import { InputGroup, Switch, Textarea, InputLeftElement, Select, Button, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, FormControl, ModalBody, FormLabel, Input, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { supabase } from '../../supabaseClient'

export default function EditProfile ({ session }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const finalRef = useRef()
  const [cohort, setCohort] = useState()
  const [name, setName] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [location, setLocation] = useState('')
  const [github, setGithub] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [interests, setInterests] = useState('')
  const [user, setUser] = useState()

  useEffect(() => {
    const user = supabase.auth.user()
    setUser(user)
  }, [])

  async function handleSubmit (e) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          user_name: name,
          pronouns: pronouns,
          location: location,
          github_link: github,
          linkedin_link: linkedIn,
          interests: interests,
          user_id: user.id,
          cohort_id: cohort
          // // user_cohort: userCohort?.cohort_id
        }
      ])
    onClose()
  }

  return (
    <>
      <Button colorScheme='orange' borderRadius='24' onClick={onOpen}>Edit Profile</Button>
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
            <ModalHeader>Your Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
            <FormControl >
              <FormLabel>Cohort</FormLabel>
              <Select ref={initialRef} onChange={(e) => setCohort(e.target.value)} placeholder="Select your Cohort">
                <option value='1'>Harakeke-22</option>
                <option value='2'>Kahikatea-22</option>
                <option value='3'>Mataī-22</option>
                <option value='4'>Pōhutukawa-22</option>
                <option value='5'>Horoeka-22</option>
              </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Ange Yu' onChange={(e) => setName(e.target.value)} value={name} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Pronouns</FormLabel>
                <Input placeholder='They/them' onChange={(e) => setPronouns(e.target.value)} value={pronouns} />
              </FormControl>


              <FormControl mt={4}>
                <FormLabel>Location</FormLabel>
                <Input placeholder='Auckland...' onChange={(e) => setLocation(e.target.value)} value={location} />
              </FormControl>
              <FormControl mt={4}>

              <FormLabel>GitHub</FormLabel>
              <InputGroup onChange={(e) => setGithub(e.target.value)} value={github}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LinkIcon color='gray.300' />}
                />
                <Input placeholder='Add link' />
              </InputGroup>

              <FormLabel>LinkedIn</FormLabel>
              <InputGroup onChange={(e) => setLinkedIn(e.target.value)} value={linkedIn}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LinkIcon color='gray.300' />}
                />
                <Input placeholder='Add link' />
              </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tech Interests...</FormLabel>
                <Input placeholder='Docker, React, Python, etc...' onChange={(e) => setInterests(e.target.value)} value={interests} />
              </FormControl>

          </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button colorScheme='orange' onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
