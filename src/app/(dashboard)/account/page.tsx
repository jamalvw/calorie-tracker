'use client'

import { updateUser } from '@/utils/api'
import { Sex, ActivityLevel, Goal, User } from '@/generated/prisma'
import { useState } from 'react'
import { UpdateUserRequest, UpdateUserResponse } from '@/utils/types'
import { useUser } from '@/providers/user-provider'
import styles from './account.module.css'

type FormField = {
    label: string
    type: string
    value: string | number | null
    options?: FormFieldOption[]
    error?: string
}

type FormFieldOption = {
    label: string
    value: string | number
}

function removeErrors(formFields: Record<string, FormField>) {
    const newFormFields = { ...formFields }
    for (const field in newFormFields) {
        newFormFields[field].error = ''
    }
    return newFormFields
}

function setErrors(formFields: Record<string, FormField>, errors: Record<string, string>) {
    const newFormFields = { ...formFields }
    for (const field in errors) {
        newFormFields[field].error = errors[field]
    }
    return newFormFields
}

function setValue(formFields: Record<string, FormField>, key: string, value: string | number | null) {
    const newFormFields = { ...formFields }
    newFormFields[key].value = value
    return newFormFields
}

export default function Account() {
    const user = useUser()

    // States
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const [formFields, setFormFields] = useState<Record<string, FormField>>({
        name: {
            label: 'Name',
            type: 'text',
            value: user.name,
        },
        email: {
            label: 'Email',
            type: 'email',
            value: user.email,
        },
        age: {
            label: 'Age',
            type: 'number',
            value: user.age,
        },
        sex: {
            label: 'Sex',
            type: 'select',
            value: user.sex,
            options: [
                { label: 'Male', value: Sex.MALE },
                { label: 'Female', value: Sex.FEMALE },
            ],
        },
        weight: {
            label: 'Weight',
            type: 'number',
            value: user.weight,
        },
        height: {
            label: 'Height',
            type: 'number',
            value: user.height,
        },
        activityLevel: {
            label: 'Activity Level',
            type: 'select',
            value: user.activityLevel,
            options: [
                { label: 'Sedentary', value: ActivityLevel.SEDENTARY },
                { label: 'Light', value: ActivityLevel.LIGHT },
                { label: 'Moderate', value: ActivityLevel.MODERATE },
                { label: 'High', value: ActivityLevel.HIGH },
            ],
        },
        goal: {
            label: 'Goal',
            type: 'select',
            value: user.goal,
            options: [
                { label: 'Gain Muscle', value: Goal.GAIN_MUSCLE },
                { label: 'Lose Weight', value: Goal.LOSE_WEIGHT },
                { label: 'Maintain Weight', value: Goal.MAINTAIN_WEIGHT },
            ],
        },
    })
    const [generalError, setGeneralError] = useState<string>('')

    const saveChanges = async () => {
        setIsSaving(true)

        const request: UpdateUserRequest = { id: user.id, data: Object.fromEntries(Object.entries(formFields)
            .filter(([, field]) => field.value !== null)
            .map(([key, field]) => [key, field.value])
        ) as Partial<User> }

        if (Object.keys(request.data).length === 0) {
            return setIsSaving(false)
        }

        const response = await updateUser(request) as UpdateUserResponse

        setIsSaving(false)

        if (!response || response.error) {
            if (response.error && response.error.fields) {
                return setFormFields(setErrors(formFields, response.error.fields))
            }
            return setGeneralError('There was an error saving changes. Please contact support.')
        }

        setFormFields(removeErrors(formFields))
        setIsEditing(false)
        setGeneralError('')
    }

    return (
        <div className={styles.accountContainer}>
            <div className={styles.account}>
                <div className={styles.accountHeader}>
                    <h1>Account</h1>
                </div>
                <div className={styles.accountContent}>
                    <form className={styles.editAccountForm} onSubmit={() => saveChanges()}>
                        <div className={styles.editAccountFormControls}>
                            <button onClick={() => setIsEditing(true)} disabled={isEditing || isSaving}>Edit</button>
                            {isEditing && <button onClick={() => saveChanges()} disabled={isSaving}>Save</button>}
                        </div>
                        <div className={styles.editAccountFormFields}>
                            {Object.entries(formFields).map(([key, field]) => (
                                <div className={styles.editAccountFormField} key={key}>
                                    <label htmlFor={key}>{field.label}</label>
                                    {field.type === 'select' ? (
                                        <select id={key} value={field.value || ''} onChange={(e) => setFormFields(setValue(formFields, key, e.target.value))} disabled={!isEditing || isSaving}>
                                            {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input type={field.type} id={key} value={field.value || ''} onChange={(e) => setFormFields(setValue(formFields, key, e.target.value))} disabled={!isEditing || isSaving} />
                                    )}
                                    {field.error && <p className="error">{field.error}</p>}
                                </div>
                            ))}
                        </div>
                        {generalError && <p className="error">{generalError}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}