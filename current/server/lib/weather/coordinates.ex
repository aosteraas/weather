defmodule Weather.Coordinates do
  @derive [Poison.Encoder]
  defstruct [:lat, :lon]
end
