import React from "react"
import "./Part1.scss"
import { useForm } from "react-hook-form"
import { numberGeneration } from "../Helper/createDocInstance"
import { SectionType } from "docx"

const firstPartNumbering = numberGeneration(1)

function Part1() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      cargoInOut: "in",
      type: "forward",
      payment: "out",
      period: "exact",
    },
  })
  const onSubmit = ({ cargoInOut }) => {
    let firstStepText
    if (cargoInOut === "out") {
      firstStepText = `По настоящему договору Пароходство обязуется перевезти в 
      навигацию 20__ года речным транспортом в прямом водном [прямом смешанном железнодорожно-водном], [прямом смешанном водно-железнодорожном] сообщении грузы Клиента в соответствии с [объемами], [номенклатурой] ассортиментом, маршрутом и сроками, указанными в Приложении № 1 к настоящему договору`
    }
    const part1 = {
      properties: {
        type: SectionType.CONTINUOUS,
      },
      children: [],
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="part-1">
      <label className="label">
        <span className="label-text">Перевозка в навигацию</span>
        <input
          type="number"
          min={2021}
          max={2030}
          {...register("navigationYear", { required: true })}
        />
      </label>
      <CargoInOut register={register} watch={watch} />
      <Equipment register={register} watch={watch} />

      <label className="label">
        <span className="label-text">Погрузка</span>
        <input type="checkbox" {...register("load")} />
      </label>
      <label className="label">
        <span className="label-text">Выгрузка</span>
        <input type="checkbox" {...register("unload")} />
      </label>

      <WithCrane register={register} watch={watch} />

      <label className="label">
        <span className="label-text">Отчистка судна</span>
        <input type="checkbox" {...register("clean")} />
      </label>
      <label className="label">
        <span className="label-text">Сопровождающий</span>
        <input type="checkbox" {...register("escort")} />
      </label>
      <label className="label">
        <span className="label-text">Рейдо-маневровая помощь</span>
        <input type="checkbox" {...register("help")} />
      </label>

      <label className="label">
        <span className="label-text"></span>
        <select {...register("payment")}>
          <option value="out">Оплата указывается в приложении</option>
          <option value="in">Оплата указывается в договоре</option>
        </select>
      </label>
      <label className="label">
        <span className="label-text">Перегрузка на Хете</span>
        <input type="checkbox" {...register("big-heta")} />
      </label>

      <label className="label">
        <span className="label-text">Количество груза</span>
        <input {...register("cargoValue", { required: true })} />
      </label>

      <LoadDate register={register} watch={watch} />
      <NN register={register} watch={watch} />

      <input type="submit" />
    </form>
  )
}

export default Part1

const WithCrane = ({ register, watch }) => {
  const withCrane = watch("crane")
  return (
    <>
      <label className="label">
        <span className="label-text">Опции для судна с краном</span>
        <input type="checkbox" {...register("crane")} />
      </label>
      {withCrane && (
        <div className="form__group">
          <Value5tonn register={register} watch={watch} />
          <label className="label">
            <span className="label-text">Перегрузка</span>
            <input type="checkbox" {...register("reload")} />{" "}
            {/* TODO тут еще про Диксон */}
          </label>
        </div>
      )}
    </>
  )
}

const CargoInOut = ({ register, watch }) => {
  const cargoInOut = watch("cargoInOut")
  return (
    <>
      <label className="label">
        <span className="label-text"></span>
        <select defaultValue="out" {...register("cargoInOut")}>
          <option value="out">Груз указывается в приложении</option>
          <option value="in">Груз указывается в договоре</option>
        </select>
      </label>
      {cargoInOut === "out" && (
        <div className="form__group">
          <label className="label">
            <span className="label-text">Вид перевозки</span>
            <select {...register("type")}>
              <option value="forward">Прямое</option>
              <option value="railway-marine">Смешанном Жд-Вод</option>
              <option value="marine-railway">Смешанном Вод-Жд</option>
            </select>
          </label>
          <label className="label">
            <span className="label-text">Объемами</span>
            <input type="checkbox" {...register("volume")} />
          </label>
          <label className="label">
            <span className="label-text">Номенклатура</span>
            <input type="checkbox" {...register("nomenclature")} />
          </label>
        </div>
      )}
      {cargoInOut === "in" && (
        <div className="form__group">
          <label className="label">
            <span className="label-text">Маршрут от</span>
            <input {...register("way_from", { required: true })} />
          </label>
          <label className="label">
            <span className="label-text">Маршрут до</span>
            <input {...register("way_to", { required: true })} />
            {/* TODO */}
          </label>
        </div>
      )}
    </>
  )
}

const Equipment = ({ register, watch }) => {
  const equipment = watch("equipment")
  return (
    <>
      <label className="label">
        <span className="label-text">Использовать технику</span>
        <input {...register("equipment")} type={"checkbox"} />
      </label>
      {equipment && (
        <div className="form__group">
          <label className="label">
            <span className="label-text">Техника из</span>
            <input {...register("equipment_start", { required: true })} />
          </label>
          <label className="label">
            <span className="label-text">Техника до</span>
            <input {...register("equipment_end", { required: true })} />
          </label>
          <label className="label">
            <span className="label-text">Возврат техники</span>
            <input {...register("equipment_return")} />
          </label>
        </div>
      )}
    </>
  )
}

const Value5tonn = ({ register, watch }) => {
  const value5tonn = watch("value5tonn")
  return (
    <>
      <label className="label">
        <span className="label-text">Груз до 5тп</span>
        <input type="checkbox" {...register("value5tonn")} />
      </label>
      {value5tonn && (
        <div className="form__group">
          <label className="label">
            <span className="label-text">Погрузка</span>
            <input type="checkbox" {...register("value5tonn_load")} />
          </label>
          <label className="label">
            <span className="label-text">Выгрузка</span>
            <input type="checkbox" {...register("value5tonn_unload")} />
          </label>
        </div>
      )}
    </>
  )
}

const LoadDate = ({ register, watch }) => {
  const loadDate = watch("loadDate")
  return (
    <>
      <label className="label">
        <span className="label-text">Прием груза к перевозке</span>
        <input type="checkbox" {...register("loadDate")} />
      </label>
      {loadDate && (
        <div className="form__group">
          <label className="label">
            <span className="label-text"></span>
            <select {...register("period")}>
              <option value="roughly">Ориентировочно</option>
              <option value="exact">Точно</option>
            </select>
          </label>
          <label className="label">
            <span className="label-text">C</span>
            <input {...register("perion-from")} />
          </label>
          <label className="label">
            <span className="label-text">По</span>
            <input {...register("period-to")} />
          </label>
        </div>
      )}
    </>
  )
}

const NN = ({ register, watch }) => {
  const isNN = watch("NN")
  return (
    <>
      <label className="label">
        <span className="label-text">НорНикель Ген груз</span>
        <input type="checkbox" {...register("NN")} />
      </label>
      {isNN && (
        <div className="form__group">
          <label className="label">
            <span className="label-text">Дата регламента</span>
            <input type="date" {...register("NN-date")} />
          </label>
        </div>
      )}
    </>
  )
}
