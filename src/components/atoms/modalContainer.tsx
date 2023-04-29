import { FunctionComponent, useContext } from "react";
import ModalContext from "../../contexts/modalContext";
import CreatePostWizard from "../molecules/createPostWizard";

const ModalContainer = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-60 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-slate-900 text-left shadow-sm transition-all sm:my-8 sm:w-full sm:max-w-xl">
            <div className="px-4 pb-4 pt-5 sm:p-4">
              {/* <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h2
                  className="text-3xl font-semibold leading-6"
                  id="modal-title"
                >
                  Deactivate account
                </h2>
                <div className="mt-5">
                  <p className="text-sm text-gray-400">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div> */}
              <div className="mb-4">
                <CloseButton closeModal={() => setIsModalOpen(false)} />
              </div>
              <CreatePostWizard />
            </div>
            {/* <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const CloseButton: FunctionComponent<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <button
      className="w-min rounded-full transition-all duration-150 hover:bg-white/10 dark:hover:bg-black/5"
      onClick={closeModal}
    >
      {closeIcon}
    </button>
  );
};

export default ModalContainer;
