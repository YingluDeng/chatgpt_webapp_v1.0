'use client'
import useSWR from "swr";
import Select from 'react-select';

const fetchModels = () => fetch('/api/getEngines').then(res => res.json());

function ModelSelection() {
    const {data: models, isLoading} = useSWR('models', fetchModels);
    const {data: model, mutate: setModel} = useSWR('model', {
        fallbackData: 'text-davinci-003',
    });

    return (
        <div className="mt-2 ">
            <Select 
                className="mt-2 text-gray-800"
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isSearchable
                isLoading={isLoading}
                menuPosition='fixed'
                classNames={{
                    control: (state) => 'bg-gray-400 border-gray-800',
                }}
                onChange={(e) => setModel(e.value)}
            />
        </div>
    );
}

export default ModelSelection;
