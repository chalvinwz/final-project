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
	Image,
	SimpleGrid,
	Center,
	Heading,
} from '@chakra-ui/react'

import { signImage } from '@/public/handimage'

function HandSignDictionary() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Button colorScheme='yellow' mr={4} onClick={() => onOpen()}>
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
						<Center>
							<SimpleGrid columns={6} spacing={16}>
								{signImage.map((s) => (
									<Image
										key={s.alt}
										objectFit='cover'
										src={s.src}
										alt={s.alt}
									/>
								))}
							</SimpleGrid>
						</Center>
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
