import { ContextProps, content, section, subsection } from "@/interfaces/contentApi"
import ModalEditPage from "./ModalEditPage"
import ModalEditList from "./ModalEditList"
import ModalEditSubpage from "./ModalEditSubpage"
import ModalNewPage from "./ModalNewPage"
import ModalNewList from "./ModalNewList"
import ModalNewSubpage from "./ModalNewSubpage"
import ModalDeletePage from "./ModalDeletePage"
import ModalDeleteList from "./ModalDeleteList"
import ModalDeleteSubpage from "./ModalDeleteSubpage"
import { Modal, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { PageContext } from "@/context/PageProvider"
import { useContext } from "react"

interface ModalProps {
  type: 'new-page' | 'new-list' | 'new-subpage' | 'edit-page' | 'edit-list' | 'edit-subpage' | 'delete-page' | 'delete-list' | 'delete-subpage'
  content?: section | subsection
}

interface ModalsContainerProps {
  modalProps: ModalProps
  onClose: () => void
  isOpen: boolean
  info: any
}

export default function ModalsContainer({modalProps, isOpen, onClose, info}: ModalsContainerProps) {

  const { data, languages, currentLanguage, setCurrentLanguage } = useContext<ContextProps>(PageContext)

  function formatToId(value: string): string {
    let newValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    newValue = newValue.replace(' ', '-').toLowerCase()
    return newValue
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      {modalProps.type === "edit-page" ? (
        <ModalEditPage
          data={data.result[currentLanguage]}
          lang={currentLanguage}
          onClose={onClose}
          info={info}
          name={modalProps.content?.name!}
          id={modalProps.content?.id!}
          formatToId={formatToId}
        />
      ) : modalProps.type === "edit-list" ? (
        <ModalEditList
          data={data.result[currentLanguage]}
          lang={currentLanguage}
          onClose={onClose}
          info={info}
          name={modalProps.content?.name!}
          id={modalProps.content?.id!}
          formatToId={formatToId}
        />
      ) : modalProps.type === "edit-subpage" ? (
        <ModalEditSubpage
          data={data.result[currentLanguage]}
          lang={currentLanguage}
          onClose={onClose}
          info={info}
          name={modalProps.content?.name!}
          id={modalProps.content?.id!}
          formatToId={formatToId}
        />
      ) : modalProps.type === "new-page" ? (
        <ModalNewPage
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          formatToId={formatToId}
        />
      ) : modalProps.type === "new-list" ? (
        <ModalNewList
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          formatToId={formatToId}
        />
      ) : modalProps.type === "new-subpage" ? (
        <ModalNewSubpage
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          formatToId={formatToId}
          id={modalProps.content?.id!}
        />
      ) : modalProps.type === "delete-page" ? (
        <ModalDeletePage
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          id={modalProps.content?.id!}
        />
      ) : modalProps.type === "delete-list" ? (
        <ModalDeleteList
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          id={modalProps.content?.id!}
        />
      ) : modalProps.type === "delete-subpage" ? (
        <ModalDeleteSubpage
          data={data.result[currentLanguage]}
          onClose={onClose}
          info={info}
          id={modalProps.content?.id!}
        />
      ) : ""}

    </Modal>
  )
}