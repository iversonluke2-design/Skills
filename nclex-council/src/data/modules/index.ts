import { dka } from './dka'
import { septicShock } from './septicShock'
import { ards } from './ards'
import { icp } from './icp'
import { cardiogenicShock } from './cardiogenicShock'
import type { Module } from '../types'

export const modules: Module[] = [dka, septicShock, ards, icp, cardiogenicShock]

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}
