
import {
  Component,
  Input,
  forwardRef
} from '@angular/core'

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() type: string = 'text'

  value: string | number | null = ''
  disabled = false

  private onChange: (value: string | number | null) => void = () => {}
  private onTouched: () => void = () => {}

  writeValue(value: string | number | null): void {
    this.value = value ?? ''
  }

  registerOnChange(
    fn: (value: string | number | null) => void
  ): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement

    const value = this.type === 'number'
      ? input.value === '' ? null : input.valueAsNumber
      : input.value

    this.value = value
    this.onChange(value)
  }

  onBlur(): void {
    this.onTouched()
  }
}
