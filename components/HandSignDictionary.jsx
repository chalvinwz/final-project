import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Text,
	Image,
	SimpleGrid,
	Center,
	Heading,
} from '@chakra-ui/react'

import { SignImage, SignPass } from '@/public/handimage'

function HandSignDictionary() {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

	return (
		<>
			<Button colorScheme='yellow' onClick={() => onOpen()}>
				Dictionary
			</Button>

			<Modal onClose={onClose} size='full' isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Center>
							<Heading>Hand Sign Dictionary</Heading>
						</Center>
					</ModalHeader>
					<ModalCloseButton size='xl' />
					<ModalBody>
						<SimpleGrid columns={8} spacing='20px'>
							{SignPass.map((s) => (
								<Image key={s.alt} objectFit='cover' src={s.src} alt={s.alt} />
							))}
						</SimpleGrid>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default HandSignDictionary
