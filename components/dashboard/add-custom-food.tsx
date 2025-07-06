import styles from './add-custom-food.module.css'
import { useState } from 'react'
import { CreateCustomFoodRequest, CreateCustomFoodResponse, ErrorCode } from '@/utils/types'
import { createCustomFood } from '@/utils/api'

export default function AddCustomFood({ closeView }: { closeView: () => void }) {
    const [name, setName] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [servingSize, setServingSize] = useState<number>(0)
    const [servingUnit, setServingUnit] = useState<string>('')
    const [customServingUnit, setCustomServingUnit] = useState<string>('')
    const [calories, setCalories] = useState<number>(0)
    const [protein, setProtein] = useState<number>(0)
    const [carbs, setCarbs] = useState<number>(0)
    const [fat, setFat] = useState<number>(0)
    const [fiber, setFiber] = useState<number>(0)
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const request: CreateCustomFoodRequest = { name, brand, servingSize, servingUnit: servingUnit == 'CUSTOM' ? customServingUnit : servingUnit, calories, protein, carbs, fat, fiber }
        const response = await createCustomFood(request) as CreateCustomFoodResponse

        if (!response || response.error) {
            switch (response?.error?.code) {
            case ErrorCode.MISSING_REQUIRED_FIELDS:
                return setError('Missing required fields')
            default:
                return setError('There was an error creating the custom food. Please contact support.')
            }
        }

        closeView()
    }

    return (
        <div className={`${styles.view} ${styles.addCustomFoodView}`}>
            <div className={styles.viewHeader}>Add Food</div>
            <form onSubmit={handleSubmit} className={styles.addCustomFoodForm}>
                <div className={styles.viewControls}>
                    <button type='button' onClick={closeView}>Close</button>
                    <button type='submit'>Add</button>
                </div>
                <div className={styles.addCustomFoodFormFields}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='brand'>Brand (optional)</label>
                        <input type='text' placeholder='Brand (optional)' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='servingSize'>Serving Size</label>
                        <input type='number' placeholder='Serving Size' value={servingSize} onChange={(e) => setServingSize(Number(e.target.value))} />
                        <label htmlFor='servingUnit'>Serving Unit</label>
                        <select id='servingUnit' value={servingUnit} onChange={(e) => setServingUnit(e.target.value)} required>
                            <option value=''>Select a unit</option>
                            <option value='G'>G</option>
                            <option value='ML'>ML</option>
                            <option value='OZ'>OZ</option>
                            <option value='LB'>LB</option>
                            <option value='KG'>KG</option>
                            <option value='MG'>MG</option>
                            <option value='CUSTOM'>Custom</option>
                        </select>
                        {servingUnit == 'CUSTOM' && <input type='text' placeholder='Custom Serving Unit' value={customServingUnit} onChange={(e) => setCustomServingUnit(e.target.value)} required />}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='calories'>Calories</label>
                        <input type='number' placeholder='Calories' value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
                        <label htmlFor='protein'>Protein</label>
                        <input type='number' placeholder='Protein' value={protein} onChange={(e) => setProtein(Number(e.target.value))} />
                        <label htmlFor='carbs'>Carbs</label>
                        <input type='number' placeholder='Carbs' value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} />
                        <label htmlFor='fat'>Fat</label>
                        <input type='number' placeholder='Fat' value={fat} onChange={(e) => setFat(Number(e.target.value))} />
                        <label htmlFor='fiber'>Fiber</label>
                        <input type='number' placeholder='Fiber' value={fiber} onChange={(e) => setFiber(Number(e.target.value))} />
                    </div>
                </div>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}